# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(email: 'salman@selecta.com', password: '12345678')
User.create(email: 'michael@selecta.com', password: '12345678')
User.create(email: 'alex@selecta.com', password: '12345678')
User.create(email: 'faisal@selecta.com', password: '12345678')

Song.create(soundcloud_id: 1)
Song.create(soundcloud_id: 2)
Song.create(soundcloud_id: 3)
Song.create(soundcloud_id: 4)
Song.create(soundcloud_id: 5)
Song.create(soundcloud_id: 6)
Song.create(soundcloud_id: 7)
Song.create(soundcloud_id: 8)
Song.create(soundcloud_id: 9)
Song.create(soundcloud_id: 10)

User.all.each {|user| user.songs << Song.find(1)}
User.find(1).songs << Song.find(2)
User.find(1).songs << Song.find(3)
User.find(1).songs << Song.find(4)
User.find(1).songs << Song.find(5)

User.find(2,3,4).each {|user| user.songs << Song.find(6)}
User.find(2).songs << Song.find(8)
User.find(2).songs << Song.find(9)
User.find(2).songs << Song.find(4)

User.find(3).songs << Song.find(7)
User.find(3).songs << Song.find(4)
User.find(3).songs << Song.find(10)

User.find(4).songs << Song.find(8)
User.find(4).songs << Song.find(11)
User.find(4).songs << Song.find(13)

