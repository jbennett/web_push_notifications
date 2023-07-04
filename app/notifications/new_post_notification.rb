# To deliver this notification:
#
# NewPostNotification.with(post: @post).deliver_later(current_user)
# NewPostNotification.with(post: @post).deliver(current_user)

class NewPostNotification < Noticed::Base
  deliver_by :database
  # deliver_by :email, mailer: "UserMailer"
  # deliver_by :slack
  # deliver_by :custom, class: "MyDeliveryMethod"
  deliver_by :web_push, class: "DeliveryMethods::WebPush"

  param :post

  def data
    {
      title: "New Post",
      body: params[:post].title,
      redirect: url
    }
  end

  def url
    post_path(params[:post])
  end
end
