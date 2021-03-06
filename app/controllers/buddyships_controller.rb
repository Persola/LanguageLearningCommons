class BuddyshipsController < ApplicationController
  def index
    @user = User.find(params[:user_id])
    @self_page = @user == current_user
    @buddies = @user.buddies
    unless @self_page
      @is_buddy = current_user.buddies.include?(@user)
      @buddyship_proposal = BuddyshipProposal.where(:proposing_user_id => @user.id,
        :target_user_id => current_user.id).first
    end
    @suggestion_language = @user.suggestion_language
  end

  def create
    @other_user = User.find(params[:id])
    current_user.bebuddy(@other_user)
    # assuming @other_user proposed to current_user
    @buddyship_proposal =
      BuddyshipProposal.where(proposing_user_id: @other_user.id,
                              target_user_id: current_user.id).first
    @buddyship_proposal.destroy
    redirect_to :back
  end

  def destroy
    current_user.unbuddy(User.find(params[:id]))
    redirect_to :back
  end
end
