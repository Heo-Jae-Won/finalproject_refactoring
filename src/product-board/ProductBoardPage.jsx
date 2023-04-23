import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductBoardList from '../productboard/ProductBoardList'
import ProductBoardRead from './ProductBoardRead'
import ProductBoardInsert from '../productboard/ProductBoardInsert'

const ProductBoardPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/list" element={<ProductBoardList/>} />
        <Route path="/read/:productCode" element={<ProductBoardRead/>} />
        <Route path="/insert/:userNickName" element={<ProductBoardInsert/>} />
      </Routes>
    </div>
  )
}













export default ProductBoardPage