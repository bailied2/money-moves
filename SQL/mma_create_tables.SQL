-- USER
-- Stores user account information
CREATE TABLE user (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE KEY NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  hash CHAR(60) NOT NULL,
  needs_new_password TINYINT(1) NOT NULL DEFAULT 0,
  password_reset_code CHAR(5) UNIQUE DEFAULT NULL
);

-- CLASSROOM
-- Stores classroom information and assigns a class teacher by their user id.
CREATE TABLE classroom (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  fk_teacher_id INT UNSIGNED NOT NULL,
  class_code CHAR(7) UNIQUE NOT NULL,
  class_name VARCHAR(100) NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  is_savings_enabled TINYINT(1) NOT NULL DEFAULT 0,
  FOREIGN KEY (fk_teacher_id) REFERENCES user(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- STUDENT
-- Assigns users to classrooms by their id.
CREATE TABLE student (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  fk_classroom_id INT UNSIGNED NOT NULL,
  fk_user_id INT UNSIGNED NOT NULL,
  UNIQUE (fk_classroom_id, fk_user_id),
  FOREIGN KEY (fk_classroom_id) REFERENCES classroom(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (fk_user_id) REFERENCES user(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- JOBS
-- Assigns classroom roles with wages and payment frequencies.
CREATE TABLE job (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  fk_classroom_id INT UNSIGNED NOT NULL,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(500) NOT NULL,
  wage DECIMAL(10,2) NOT NULL,
  pay_frequency ENUM('Daily', 'Weekly', 'Monthly') NOT NULL,
  pay_day ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
  icon_class VARCHAR(100) NOT NULL,
  is_trustee TINYINT(1) NOT NULL DEFAULT FALSE,
  FOREIGN KEY (fk_classroom_id) REFERENCES classroom(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- PROPERTIES
-- Represents rentable classroom spaces with a value, rent, and maintenance cost.
CREATE TABLE property (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  fk_classroom_id INT UNSIGNED NOT NULL,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(500) NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  rent DECIMAL(10,2) NOT NULL,
  maintenance DECIMAL(10,2) NOT NULL,
  pay_frequency ENUM('Daily', 'Weekly', 'Monthly') NOT NULL,
  pay_day ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
  icon_class VARCHAR(100) NOT NULL,
  FOREIGN KEY (fk_classroom_id) REFERENCES classroom(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- EXPENSES_BONUSES
-- Tracks classroom fees, fines, and rewards.
CREATE TABLE fees_bonuses (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  fk_classroom_id INT UNSIGNED NOT NULL,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(500) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  icon_class VARCHAR(100) NOT NULL,
  FOREIGN KEY (fk_classroom_id) REFERENCES classroom(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- INVESTMENT_ACCOUNTS
-- Stores class-related investment funds.
CREATE TABLE investment_account (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  fk_classroom_id INT UNSIGNED NOT NULL,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(500) NOT NULL,
  FOREIGN KEY (fk_classroom_id) REFERENCES classroom(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- YEAR_ENDS
-- Defines year-end dates and financial details, including an annual savings APR.
CREATE TABLE year_end (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  fk_classroom_id INT UNSIGNED NOT NULL,
  end_date TIMESTAMP NOT NULL,
  savings_apr DECIMAL(5,2) NOT NULL,
  UNIQUE (fk_classroom_id, end_date),
  FOREIGN KEY (fk_classroom_id) REFERENCES classroom(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- ACCOUNT
-- Represents a student's checking, savings, or investment account.
CREATE TABLE account (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  -- fk_classroom_id INT UNSIGNED NOT NULL,
  fk_student_id INT UNSIGNED NOT NULL,
  fk_investment_account_id INT UNSIGNED,
  account_type TINYINT UNSIGNED NOT NULL,
  -- FOREIGN KEY (fk_classroom_id, fk_user_id) REFERENCES classroom_student(fk_classroom_id, fk_user_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (fk_student_id) REFERENCES student(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (fk_investment_account_id) REFERENCES investment_account(id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- Set account id auto-increment to start at 10000000 to emulate account numbers
ALTER TABLE account AUTO_INCREMENT=10000000;


-- TRANSACTIONS
-- Represents money movements for students (e.g., deposits, deductions, investments).
CREATE TABLE transaction (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  fk_account_id INT UNSIGNED NOT NULL,
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  description VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (fk_account_id) REFERENCES account(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- INVESTMENT_VALUES
-- Assigns share values to investment accounts at year-end.
CREATE TABLE investment_values (
  fk_account_id INT UNSIGNED NOT NULL,
  fk_year_end_id INT UNSIGNED NOT NULL,
  share_value DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (fk_account_id, fk_year_end_id),
  FOREIGN KEY (fk_account_id) REFERENCES investment_account(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (fk_year_end_id) REFERENCES year_end(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- STUDENT_JOBS
-- Maps students to their assigned jobs.
CREATE TABLE student_jobs (
  fk_student_id INT UNSIGNED NOT NULL,
  fk_job_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (fk_student_id, fk_job_id),
  FOREIGN KEY (fk_student_id) REFERENCES student(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (fk_job_id) REFERENCES job(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- STUDENT_PROPERTIES
-- Tracks student property ownership and rentals.
CREATE TABLE student_properties (
  fk_student_id INT UNSIGNED NOT NULL,
  fk_property_id INT UNSIGNED NOT NULL,
  is_owner TINYINT(1) NOT NULL DEFAULT FALSE,
  PRIMARY KEY (fk_student_id, fk_property_id),
  FOREIGN KEY (fk_student_id) REFERENCES student(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (fk_property_id) REFERENCES property(id) ON UPDATE CASCADE ON DELETE CASCADE
);