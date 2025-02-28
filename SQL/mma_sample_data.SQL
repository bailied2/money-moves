-- Sample User Logins:
-- EMAIL                      :   PASSWORD
-- --------------------------------------------
-- alice.smith@example.com    :   password123
-- bob.jones@example.net      :   securePass!
-- charlie.brown@example.org  :   letMeIn2024
-- dana.white@example.com     :   qwerty789
-- eva.adams@example.io       :   strongPass99
-- --------------------------------------------

-- Sample Users
INSERT INTO users (email, first_name, last_name, hash) VALUES
('alice.smith@example.com', 'Alice', 'Smith', '$2b$12$CgCeOrLN4F0312hK6IfdKem4Ris6cGwSwWAwjXbyZTnpFhxEMqum6'),
('bob.jones@example.net', 'Bob', 'Jones', '$2b$12$Q1/S.Y5gJORCtvjaaczQpObT4PQR7zfC1KYL6dVd..ciwNy89uF42'),
('charlie.brown@example.org', 'Charlie', 'Brown', '$2b$12$tywUCL9nYuSpUobdyZL3QulxSIDqauYp6QUVstxjxXwqGvW.wU3bu'),
('dana.white@example.com', 'Dana', 'White', '$2b$12$XBxNsA5p568xSBJFpT1Lz.1EbA/WSCjJlg6uzXbdv/PYwNAbMz/yG'),
('eva.adams@example.io', 'Eva', 'Adams', '$2b$12$rF5zLEPgSVj7UsPQEmkD3OVxo30IVAZRixdkP0q3QWuaoYyJ13jbS');

-- Sample Classrooms
INSERT INTO classrooms (fk_teacher_id, class_code, class_name, start_date, end_date, is_savings_enabled) VALUES
(1, 'PAFXNS8T1T4B', 'Math 101', '2024-03-12 23:31:47', '2025-10-29 23:31:47', 0),
(2, 'JR1XNM8JEHCB', 'History 202', '2024-10-20 23:31:47', '2026-01-19 23:31:47', 0),
(3, 'TKL26KX13TAP', 'Science 303', '2024-10-13 23:31:47', '2025-06-03 23:31:47', 0),
(4, 'OYYZ21VPRS7I', 'English 404', '2024-08-09 23:31:47', '2025-06-14 23:31:47', 0),
(5, 'YTZNVW7WMGKI', 'Physics 505', '2024-12-06 23:31:47', '2025-04-15 23:31:47', 1);

-- Sample Students
INSERT INTO students (fk_classroom_id, fk_user_email) VALUES
(1, 'alice.smith@example.com'),
(1, 'bob.jones@example.net'),
(2, 'charlie.brown@example.org'),
(3, 'dana.white@example.com'),
(4, 'eva.adams@example.io');

-- Sample Transactions
INSERT INTO transactions (fk_classroom_id, fk_student_id, account_id, description, amount) VALUES
(1, 1, 1, 'Allowance deposit', 50.00),
(1, 2, 2, 'Class fee deduction', -20.00),
(2, 3, 1, 'Weekly salary', 30.00),
(3, 4, 2, 'Field trip expense', -15.00),
(4, 5, 1, 'Bonus reward', 10.00);

-- Sample Jobs
INSERT INTO jobs (fk_classroom_id, title, description, wage, pay_frequency, pay_day, icon_id, is_trustee) VALUES
(1, 'Class Treasurer', 'Manages class funds and budgets.', 15.00, 'Weekly', 'Friday', 1, 1),
(2, 'Board Cleaner', 'Cleans the classroom board daily.', 5.00, 'Daily', 'Monday', 2, 0),
(3, 'Homework Checker', 'Helps verify student homework.', 12.00, 'Weekly', 'Wednesday', 3, 0),
(4, 'Library Assistant', 'Organizes class library books.', 10.00, 'Monthly', 'Tuesday', 4, 0),
(5, 'Energy Monitor', 'Ensures lights and devices are off.', 8.00, 'Weekly', 'Thursday', 5, 0);

-- Sample Properties
INSERT INTO properties (fk_classroom_id, title, description, value, rent, maintenance, pay_frequency, pay_day, icon_id) VALUES
(1, 'Classroom Condo', 'A small condo for students to rent.', 500.00, 50.00, 5.00, 'Monthly', 'Monday', 1),
(2, 'Student Loft', 'A loft space available for rent.', 800.00, 75.00, 10.00, 'Monthly', 'Friday', 2),
(3, 'Library Spot', 'Exclusive reading space in the class library.', 200.00, 20.00, 2.50, 'Weekly', 'Wednesday', 3),
(4, 'Lab Desk', 'Premium desk with access to lab equipment.', 300.00, 30.00, 4.00, 'Weekly', 'Tuesday', 4),
(5, 'Window Seat', 'A desk next to the best view in the room.', 150.00, 15.00, 1.50, 'Weekly', 'Thursday', 5);

-- Sample Expenses and Bonuses
INSERT INTO expenses_bonuses (fk_classroom_id, title, description, amount, icon_id) VALUES
(1, 'School Supplies', 'Mandatory school supply fee.', -25.00, 1),
(2, 'Participation Bonus', 'Reward for classroom engagement.', 10.00, 2),
(3, 'Library Fine', 'Penalty for late book returns.', -5.00, 3),
(4, 'Achievement Award', 'Bonus for outstanding performance.', 20.00, 4),
(5, 'Classroom Party Fund', 'Contribution to class events.', -15.00, 5);

-- Sample Investment Accounts
INSERT INTO investment_accounts (fk_classroom_id, title, description) VALUES
(1, 'Stocks Fund', 'A stocks-based investment fund.'),
(2, 'Bond Fund', 'A bond-based investment fund.'),
(3, 'ETF', 'An ETF fund.');

-- Sample Year Ends
INSERT INTO year_ends (fk_classroom_id, end_date, savings_apr) VALUES
(1, '2025-12-31 23:59:59', 2.50),
(2, '2025-11-30 23:59:59', 3.00),
(3, '2025-01-15 23:59:59', 2.75),
(4, '2025-02-28 23:59:59', 3.25),
(5, '2025-10-31 23:59:59', 2.00);

-- Sample Investment Values
INSERT INTO investment_values (fk_account_id, fk_year_end_id, share_value) VALUES
(1, 1, 10.50),
(2, 2, 12.75),
(3, 3, 9.80),
(4, 4, 15.00),
(5, 5, 11.20);

-- Sample Student Jobs
INSERT INTO student_jobs (fk_student_id, fk_job_id) VALUES
(1, 1),  -- Alice Smith is Class Treasurer
(2, 2),  -- Bob Jones is Board Cleaner
(3, 3),  -- Charlie Brown is Homework Checker
(4, 4),  -- Dana White is Library Assistant
(5, 5);  -- Eva Adams is Energy Monitor

-- Sample Student Properties
INSERT INTO student_properties (fk_student_id, fk_property_id, is_owner) VALUES
(1, 1, 1),  -- Alice owns Classroom Condo
(2, 2, 0),  -- Bob rents Student Loft
(3, 3, 1),  -- Charlie owns Library Spot
(4, 4, 0),  -- Dana rents Lab Desk
(5, 5, 1);  -- Eva owns Window Seat
