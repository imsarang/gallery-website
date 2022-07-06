import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  images : [],
  image_category:[],
  current_image_id : null,
 
  
  image_upload:[]
}

const imageReducer = createSlice({
  name: 'image',
  initialState,
  reducers: {
      IMAGE_UPLOAD:(state,action)=>{
        state.images.push(action.payload)

        // state.images = [...state.images,action.payload]
      },
      IMAGE_CATEGORY:(state,action)=>{
        state.image_category = action.payload
      },
      CURRENT_IMAGE:(state,action)=>{
        state.current_image_id = action.payload.current_image_id
      },
      
      IMAGE_USER:(state,action)=>{
        state.image_upload = action.payload
      }
  }
});

export const {IMAGE_UPLOAD,IMAGE_CATEGORY,CURRENT_IMAGE,
            IMAGE_LIKE,IMAGE_DISLIKE,
            IMAGE_USER} = imageReducer.actions

export default imageReducer.reducer
export const imageInfo = (state)=>state.image.images
export const imageCategory = (state)=>state.image.image_category
export const currentImage = (state)=>state.image.current_image_id

export const imageUsername = (state)=>state.image.image_upload
