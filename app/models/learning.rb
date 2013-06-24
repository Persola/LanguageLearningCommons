class Learning < ActiveRecord::Base
  attr_accessible :language, :language_id, :user, :user_id

	belongs_to :user
	belongs_to :language

  validates :user, :language, :presence => true
  validate :user_language_uniqueness

  def user_language_uniqueness
    unless (Knowing.find_by_user_id_and_language_id(user_id, language_id) == nil) &&
           (Learning.find_by_user_id_and_language_id(user_id, language_id) == nil)
      errors.add(:user, "User already has a relationship with this language.")
    end
  end
end
