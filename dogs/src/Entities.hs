{-# LANGUAGE QuasiQuotes, TypeFamilies, GeneralizedNewtypeDeriving, TemplateHaskell,
             OverloadedStrings, GADTs, FlexibleContexts, ScopedTypeVariables,
             MultiParamTypeClasses, FlexibleInstances #-}

module Entities where

import Data.Text
import Data.Aeson

import Database.Persist
import Database.Persist.Postgresql
import Database.Persist.TH
--import Control.Monad.IO.Class (liftIO)
import Data.Time
--import Control.Monad.Logger
import EntityEnums


share [mkPersist sqlSettings, mkMigrate "migrateAll"] [persistLowerCase|
Person json
   name Text
   city Text
   contact Text
   link Text
   deriving Show

Dog json
   name Text
   sex Sex
   pedigree Text
   pedigreeNo Text
   link Text Maybe
   tattoo Text Maybe
   chip Text Maybe
   dob Day
   color Text
   ownerId PersonId Maybe
   coownerId PersonId Maybe
   breederId PersonId Maybe
   cobreederId PersonId Maybe
   fatherId DogId Maybe
   motherId DogId Maybe
   deriving Show
|]
