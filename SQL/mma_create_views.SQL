-- mma_create_views.SQL

-- student_profile
CREATE OR REPLACE VIEW student_profile AS
SELECT student.id AS student_id, 
  student.fk_user_id AS user_id, 
  student.fk_classroom_id AS classroom_id,
  user.first_name AS first_name,
  user.last_name AS last_name,
  user.email AS email,
  classroom.class_name AS class_name,
  classroom.class_code AS class_code,
  classroom.is_savings_enabled AS is_savings_enabled
FROM student
LEFT JOIN user
ON student.fk_user_id = user.id
LEFT JOIN classroom 
ON student.fk_classroom_id = classroom.id; 

-- account_info
CREATE OR REPLACE VIEW account_info AS
SELECT account.*,
  CASE
    WHEN account_type = 1 THEN "Checking Account"
    WHEN account_type = 2 THEN "Savings Account"
    ELSE investment_account.title
  END AS account_type_string,
  SUM(transaction.amount) AS balance
FROM account
LEFT JOIN transaction
ON transaction.fk_account_id = account.id
LEFT JOIN investment_account
ON investment_account.id = account.fk_investment_account_id
GROUP BY account.id; 

  -- "SELECT account.*, 
  -- SUM(transaction.amount) AS balance 
  -- FROM account 
  -- LEFT JOIN transaction 
  -- ON transaction.fk_account_id = account.id 
  -- WHERE account.fk_student_id = ? 
  -- GROUP BY account.id";