# README

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|name|string|index: true, null: false, |unique: true|
|mail|string|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
- has_many :groups,through:members
- has_many:messages
- has_many:members
