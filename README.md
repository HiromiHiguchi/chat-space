# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
has_many :messages
has_many :groups,throuh: :users_groups
has_many :groups_users

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
has_many :messages
has_many :users,throuh: :users_groups
has_many :groups_users


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|text|text|
|image|string|
|user_id|reference|null: false, foreign_key: true|
|group_id|reference|null: false, foreign_key: true|
### Association
blongs_to :users
blongs_to :groups

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|reference|null: false, foreign_key: true|
|group_id|reference|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user