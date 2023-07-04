class WebPushSubscriptionsController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :require_login

    def create
        @subscrption = WebPushSubscription.create!(user: current_user, endpoint: params[:endpoint], auth_key: params[:keys][:auth], p256dh_key: params[:keys][:p256dh]) do |sub|
            sub.user_agent = request.user_agent
        end

        head :ok
    end
end
