{-# LANGUAGE DuplicateRecordFields #-}
{-# LANGUAGE OverloadedStrings, FlexibleContexts, DeriveGeneric #-}

module Model where

{-
module Model (
        testAction,
        prepareStatementsPerson,
        PreparedStatements,
        findAllPersons,
        findOnePerson,
        fromSqlToPerson,
        testPerson,
        Person
    ) where


import Data.Text
import Data.Time
import Data.Time.Calendar

import GHC.Generics
import Data.Aeson

import Database.HDBC
import Database.HDBC.PostgreSQL

import Control.Applicative
data SexType = Male | Female

data Person = Person {
                        id :: Int
                      , name :: Text
                      , old_id :: Int
                      , city :: String
                      , contact :: String
                      , link :: String


                     } deriving (Generic, Show)


instance ToJSON Person where
    -- No need to provide a toJSON implementation.

    -- For efficiency, we write a simple toEncoding implementation, as
    -- the default version uses toJSON.
    toEncoding = genericToEncoding defaultOptions

instance FromJSON Person
    -- No need to provide a parseJSON implementation.


{-
Idea here is as follows:
- PreparedStatements contains prepared statements for a specific table, but to initialize them we need to:
- call ps = prepareStatementsPerson conn, where conn is active database connection
- after that, calling "findAll ps" returns [[SqlValue]] with query results
-}

data PreparedStatements = PreparedStatements {
                        findAll :: IO Statement
                      , findOne :: IO Statement
                     }

prepareStatementsPerson conn = PreparedStatements {
    findAll = prepare conn "SELECT * FROM people",
    findOne = prepare conn "SELECT * FROM people WHERE id = ?"
}


findAllPersons ps = findAll ps >>= \x1 -> execute x1 [] >> fetchAllRows x1
findOnePerson ps id = findOne ps >>= \x1 -> execute x1 [toSql id] >> fetchAllRows x1

fromSqlToPerson :: [SqlValue] -> Person
fromSqlToPerson x = Person {
                        id = (fromSql $ x !! 0),
                        name = (fromSql $ x !! 1),
                        old_id = (fromSql $ x !! 2) :: Int,
                        city = (fromSql $ x !! 3) :: String,
                        contact = (fromSql $ x !! 4) :: String,
                        link = (fromSql $ x !! 5) :: String
                    }


testPerson = Person {
                        id = 0,
                        name = "русское имя and some english",
                        old_id = 0,
                        city = "moscow",
                        contact = "no contact",
                        link = "link"
                    }


data Dog = Dog {
                        name :: String
                      , sex :: SexType
                      , pedigree :: String
                      , pedigreeNo :: String
                      , link :: String
                      , tatoo :: String
                      , chip :: String
                      , color :: String
                      , breed :: String
                      , dob :: Day
                      , id :: Int

                     }



testAction = do
    dbh <- connectPostgreSQL "host=localhost dbname=dogs user=postgres"
    let ps = prepareStatementsPerson dbh
    findAllPersons ps
    -- tt <- quickQuery' dbh "SELECT * FROM dogs LIMIT 2" []
-}

-- connectDB = connectPostgreSQL "host=localhost dbname=dogs user=postgres"
