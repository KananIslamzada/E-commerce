import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import base from '../../helpers/base';

export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', () => {
    console.log(base.token);
    console.log(base.userId);
  if (base.token) {
    return base.api().get(`wishlists/${base.userId}`).then((reponse)=>{return reponse.data.data})
  }
});

const wishlist = createSlice({
  name: 'wishlist',
  initialState: {
    content: [],
    pending:false
  },
  reducers: {
    setWishlist: (state, action) => {
      state.content = action.payload.data;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchWishlist.pending, state => {
      state.pending=true
    });
    builder.addCase(fetchWishlist.fulfilled, (state, action) => {

      state.content = action.payload;
      state.pending=false
    }),
      builder.addCase(fetchWishlist.rejected, (state, action) => {
         (state.content = []);
      });
  },
});
export const setWishlist = wishlist.actions.setWishlist;

export default wishlist.reducer;