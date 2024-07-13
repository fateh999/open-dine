import { gql } from '@apollo/client';

export const GET_FOODS = gql`
  query getFoods($take: Int!, $skip: Int!, $search: String) {
    foods(skip: $skip, take: $take, search: $search) {
      items {
        id
        photoUrl
        categoryId
        description
        foodType
        name
        description
        createdAt
        updatedAt
        status
        customizations {
          costPrice
          sellingPrice
          name
          isDefault
        }
        category {
          id
          name
        }
      }
      totalCount
      conditionalTotalCount
      totalPages
      currentPage
    }
  }
`;

export const GET_FOOD = gql`
  query getFood($id: String!) {
    food(id: $id) {
      id
      photoUrl
      categoryId
      description
      foodType
      name
      description
      createdAt
      updatedAt
      status
      customizations {
        costPrice
        sellingPrice
        name
        isDefault
      }
      category {
        id
        name
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query getCategories($take: Int!, $skip: Int!, $search: String) {
    categories(skip: $skip, take: $take, search: $search) {
      items {
        id
        name
        updatedAt
        createdAt
      }
      totalCount
      conditionalTotalCount
      totalPages
      currentPage
    }
  }
`;

export const GET_CATEGORY = gql`
  query getCategory($id: String!) {
    category(id: $id) {
      id
      name
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query getAllCategories {
    allCategories {
      id
      name
      updatedAt
      createdAt
    }
  }
`;

export const GET_MENU = gql`
  query getMenu($id: String!) {
    menu(id: $id) {
      id
      name
      active
      menuCategories {
        menuOrder
        category {
          id
          name
        }
      }
    }
  }
`;

export const GET_MENUS = gql`
  query getMenus($take: Int!, $skip: Int!, $search: String) {
    menus(skip: $skip, take: $take, search: $search) {
      items {
        id
        name
        active
        updatedAt
        createdAt
      }
      totalCount
      conditionalTotalCount
      totalPages
      currentPage
    }
  }
`;
