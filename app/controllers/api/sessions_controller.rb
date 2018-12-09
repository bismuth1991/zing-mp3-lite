class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if @user 
      login(@user)
    else
      render json: ["Invalid credentials"], status: 401
    end
  end 

  def destroy
    if current_user
      logout!
      render json: {}
    else 
      render json: ["Nobody is signed in"], status: 400
    end
  end

end