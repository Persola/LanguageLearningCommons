Language.create!(name: "Mandarin")
Language.create!(name: "Spanish")
Language.create!(name: "English")
Language.create!(name: "Hindi")
Language.create!(name: "Arabic")
Language.create!(name: "Portuguese")
Language.create!(name: "Bengali")
Language.create!(name: "Russian")
Language.create!(name: "Japanese")
Language.create!(name: "Punjabi")
Language.create!(name: "German")

User.create!(name: "pep", email: "p@e.p", password: "12121212")
User.create!(name: "ego", email: "e@g.o", password: "12121212")

Knowing.create!(language_id: 1, user_id: 1)
Knowing.create!(language_id: 2, user_id: 1)
Knowing.create!(language_id: 4, user_id: 1)
Learning.create!(language_id: 3, user_id: 1)


Knowing.create!(language_id: 3, user_id: 2)
Learning.create!(language_id: 1, user_id: 2)
Learning.create!(language_id: 2, user_id: 2)
Learning.create!(language_id: 4, user_id: 2)