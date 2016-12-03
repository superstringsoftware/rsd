-- All Enums in persistence
{-# LANGUAGE TemplateHaskell, DeriveGeneric #-}

module EntityEnums where

import Database.Persist.TH
import Prelude
import Data.Aeson
import GHC.Generics

data Sex = Male | Female deriving (Show, Read, Eq, Generic)
derivePersistField "Sex"

instance ToJSON Sex
instance FromJSON Sex
