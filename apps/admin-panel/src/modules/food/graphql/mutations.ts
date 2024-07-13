import { gql } from '@apollo/client';

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: String!) {
    deleteCategory(id: $id) {
      id
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation addCategory($createCategoryInput: CreateCategoryInput!) {
    createCategory(createCategoryInput: $createCategoryInput) {
      id
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($updateCategoryInput: UpdateCategoryInput!) {
    editCategory(updateCategoryInput: $updateCategoryInput) {
      id
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct($createFoodInput: CreateFoodInput!) {
    createFood(createFoodInput: $createFoodInput) {
      __typename
      id
      name
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($updateFoodInput: UpdateFoodInput!) {
    editFood(updateFoodInput: $updateFoodInput) {
      __typename
      id
      name
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: String!) {
    deleteFood(id: $id) {
      id
    }
  }
`;

export const ADD_MENU = gql`
  mutation addMenu($createMenuInput: CreateMenuInput!) {
    createMenu(createMenuInput: $createMenuInput) {
      id
    }
  }
`;

export const UPDATE_MENU = gql`
  mutation updateMenu($updateMenuInput: UpdateMenuInput!) {
    editMenu(updateMenuInput: $updateMenuInput) {
      id
    }
  }
`;

export const DELETE_MENU = gql`
  mutation deleteMenu($id: String!) {
    deleteMenu(id: $id) {
      id
    }
  }
`;
