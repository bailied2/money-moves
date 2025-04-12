-- classroom_id = 28

-- year_end:
-- [
--    Year 0: { 
--      fk_classroom_id: 28,
--      end_date: TIMESTAMP'1970-01-01 00:00:00'
--      savings_apr: 0,
--    },
--    Year 1: { 
--      fk_classroom_id: 28,
--      end_date: TIMESTAMP'2025-04-10 00:00:00'
--      savings_apr: 5,
--    },
--    Year 2: { 
--      fk_classroom_id: 28,
--      end_date: TIMESTAMP'2025-04-17 00:00:00'
--      savings_apr: 5,
--    },
--    Year 3: { 
--      fk_classroom_id: 28,
--      end_date: TIMESTAMP'2025-04-24 00:00:00'
--      savings_apr: 5,
--    },
-- ]

INSERT INTO year_end (fk_classroom_id, end_date, savings_apr) VALUES 
(28, TIMESTAMP'2025-04-10 00:00:00', 5),
(28, TIMESTAMP'2025-04-17 00:00:00', 5),
(28, TIMESTAMP'2025-04-24 00:00:00', 5);

INSERT INTO investment_values (fk_account_id, fk_year_end_id, share_value) VALUES
(7, 8, 20),
(7, 9, 35),
(7, 10, 24),
(9, 8, 12),
(9, 9, 15),
(9, 10, 17);

-- investment_account:
-- [
--    Stocks: { 
--      id: 7
--      fk_classroom_id: 28,
--      title: "Stocks",
--      description: "A simple stocks account"
--    },
--    Bonds: { 
--      id: 8
--      fk_classroom_id: 28,
--      title: "Bonds",
--      description: "A simple bonds account"
--    },
-- ]

-- investment_values:
-- [
--    Stocks:
--
--    Year 0:
--    {
--      fk_account_id: 7,
--      fk_year_end_id: 
--    }
--    Year 1:
--    {
--      
--    }
--    Year 2:
--    {
--      
--    }
--    Year 3:
--    {
--      
--    }
--    { 
--      fk_classroom_id: 28,
--      title: "Stocks",
--      description: "A simple stocks account"
--    },
--    Bonds: { 
--      fk_classroom_id: 28,
--      title: "Bonds",
--      description: "A simple bonds account"
--    },
-- ]


-- investment_account_id = 7
-- student id: 23

INSERT INTO investment_account (fk_classroom_id, title, description) VALUES (28, "Bonds", "A simple bonds account");

SELECT investment_values.fk_account_id AS investment_account_id, year_end.end_date as end_date, investment_values.share_value AS share_value 
FROM investment_values
RIGHT JOIN year_end
ON investment_values.fk_year_end_id = year_end.id
WHERE year_end.fk_classroom_id = 28
ORDER BY investment_account_id;