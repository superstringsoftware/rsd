{-# LANGUAGE QuasiQuotes, TypeFamilies, GeneralizedNewtypeDeriving, TemplateHaskell,
             OverloadedStrings, GADTs, FlexibleContexts, ScopedTypeVariables,
             MultiParamTypeClasses, FlexibleInstances #-}

module Main where

import Data.Text
import Data.Aeson

import Lib
import Entities

import Network.Wai
import Network.HTTP.Types (status200)
import Network.Wai.Handler.Warp (run)

import Database.Persist
import Database.Persist.Postgresql
import Database.Persist.TH
import Control.Monad.IO.Class (liftIO)
import Data.Time
import Control.Monad.Logger

import Web.Scotty

connStr = "host=localhost dbname=dogsdb user=postgres"

application req respond = do
  putStrLn $ show (queryString req)
  putStrLn $ show (pathInfo req)
  respond $ responseLBS status200 [("Content-Type", "text/html")] "<h1>Hello World</h1>"

-- main = run 3000 application

main = runStdoutLoggingT $ withPostgresqlPool connStr 10 $ \pool ->
     liftIO $ flip runSqlPersistMPool pool $ do
        printMigration migrateAll
        --runMigration migrateAll

        res  :: [Entity Person] <- selectList [] [LimitTo 1]
        res1 :: [Entity Dog] <- selectList [] [LimitTo 1]
        liftIO $ print res
        liftIO $ print res1
