{-# LANGUAGE QuasiQuotes, TypeFamilies, GeneralizedNewtypeDeriving, TemplateHaskell,
             OverloadedStrings, GADTs, FlexibleContexts, ScopedTypeVariables,
             MultiParamTypeClasses, FlexibleInstances #-}

import Data.Text
import UI.NCurses

import System.Console.Haskeline

import Entities

import Database.Persist
import Database.Persist.Postgresql
import Database.Persist.TH
import Control.Monad.IO.Class (liftIO)
import Data.Time
import Control.Monad.Logger
import Data.Pool

connStr = "host=localhost dbname=dogsdb user=postgres"

main :: IO ()
main = runStdoutLoggingT $ do -- persistent stuff needs to be in LoggingT IO ()
    pool :: ConnectionPool <- createPostgresqlPool connStr 10 -- creating a pool
    -- destroyAllResources pool
    liftSqlPersistMPool mainLoop pool
    liftIO $ runInputT defaultSettings (loop pool)
    -- return ()

mainLoop = do
    printMigration migrateAll
    --runMigration migrateAll

    res  :: [Entity Person] <- selectList [] [LimitTo 1]
    res1 :: [Entity Dog] <- selectList [] [LimitTo 1]
    liftIO $ print res
    liftIO $ print res1

-- converts maybe text into text
mbc :: Maybe String -> Text
mbc (Just s) = pack s
mbc Nothing = ""

-- create a new person in the db
newperson = do
    nm <- getInputLine "Name: "
    ct <- getInputLine "City: "
    cc <- getInputLine "Contact: "
    ln <- getInputLine "Link: "
    let p = Person (mbc nm) (mbc ct) (mbc cc) (mbc ln)
    return p


loop :: ConnectionPool -> InputT IO ()
loop pool = do
   minput <- getInputLine "% "
   case minput of
       Nothing -> return ()
       Just "quit" -> return ()
       Just "db"   -> do
           outputStrLn "Running db"
           p <- newperson
           outputStrLn $ show p
           flip liftSqlPersistMPool pool $ do
               pid <- insert p
               pc <- get pid
               liftIO $ print (pc :: Maybe Person)
           loop pool
       Just input -> do outputStrLn $ "Input was: " ++ input
                        loop pool


{- NCURSES *************************************  -}

ncursesMain :: IO ()
ncursesMain = runCurses $ do
    setEcho True
    w <- newWindow 0 0 0 0  --defaultWindow
    updateWindow w $ do
        moveCursor 1 10
        drawString "Hello world! - и по русски"
        moveCursor 3 10
        drawString "(press q to quit)"
        moveCursor 0 0

    render
    waitFor w (\ev -> ev == EventCharacter 'q' || ev == EventCharacter 'Q')

waitFor :: Window -> (Event -> Bool) -> Curses ()
waitFor w p = loop where
    loop = do
        ev <- getEvent w Nothing
        case ev of
            Nothing -> loop
            Just ev' -> if p ev' then return () else loop
