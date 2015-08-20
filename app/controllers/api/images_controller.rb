class Api::ImagesController < ApplicationController
  def index
    @images = Image.all
  end

  def show
    @image = Image.find(params[:id])
  end

  def create
    @image = Image.new(image_params)
    if @image.save
      render :show
    else
      render json: @image.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @image = Image.find(params[:id])
    if @image.update(image_params)
      render :show
    else
      render json: @image.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @image = Image.find(params[:id])
    @image.destroy!
    render json: @image
  end

  private
  def image_params
    params.require(:image).permit(:url, :thumb_url, :imageable_id, :imageable_type)
  end
end
