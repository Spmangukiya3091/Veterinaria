import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER_URL}/users/`,
    prepareHeaders: (headers, { getState }) => {
      const cookies = document.cookie.split(";");
      let jwtCookie = null;

      cookies.map((cookie) => {
        if (cookie.includes("authToken=")) {
          jwtCookie = "Bearer " + cookie.split("authToken=")[1];
        }
        return null;
      });

      if (jwtCookie) {
        headers.set("authorization", jwtCookie);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Login APIs

    getLoginUserDetails: builder.query({
      query: (body) => ({
        url: `loginUserDetail/${body}`,
        method: "GET",
      }),
    }),

    getUserList: builder.query({
      query: () => ({
        url: "userList",
        method: "GET",
      }),
    }),
    userFilter: builder.query({
      query: (filter) => ({
        url: `userFilter${filter}`,
        method: "GET",
      }),
    }),

    sendUserPassword: builder.mutation({
      query: (id) => ({
        url: `sendUserPassword/${id}`,
        method: "POST",
      }),
    }),

    userLogin: builder.mutation({
      query: (body) => ({
        url: "userLogins",
        method: "POST",
        body: body,
      }),
    }),

    createUser: builder.mutation({
      query: (body) => ({
        url: "userRegistration",
        method: "POST",
        body: body,
      }),
    }),

    updatePassword: builder.mutation({
      query: (body) => ({
        url: "updatePassword",
        method: "PUT",
        body: body,
      }),
    }),

    changePassword: builder.mutation({
      query: (body) => ({
        url: `changePassword/${body.id}`,
        method: "POST",
        body: body,
      }),
    }),

    verificationLink: builder.mutation({
      query: (body) => ({
        url: `verificationLink`,
        method: "POST",
        body: { email: body },
      }),
    }),

    removeUser: builder.mutation({
      query: (body) => ({
        url: `deleteUserProfile/${body.id}`,
        method: "DELETE",
        body: body,
      }),
    }),
  }),
});

export const {
  useUserFilterQuery,
  useGetUserListQuery,
  useGetLoginUserDetailsQuery,
  useUserLoginMutation,
  useCreateUserMutation,
  useChangePasswordMutation,
  useUpdatePasswordMutation,
  useSendUserPasswordMutation,
  useVerificationLinkMutation,
  useRemoveUserMutation,
} = adminApi;

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER_URL}/dashboard/`,
    prepareHeaders: (headers, { getState }) => {
      const cookies = document.cookie.split(";");
      let jwtCookie = null;

      cookies.map((cookie) => {
        if (cookie.includes("authToken=")) {
          jwtCookie = "Bearer " + cookie.split("authToken=")[1];
        }
        return null;
      });

      if (jwtCookie) {
        headers.set("authorization", jwtCookie);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Dashboard APIs
    getMetrics: builder.query({
      query: (body) => ({
        url: `dashboardSummary?month=${body}`,
        method: "GET",
      }),
    }),

    getAppoinmentGraph: builder.query({
      query: () => ({
        url: `appointmentGraph`,
        method: "GET",
      }),
    }),

    getVetsAppoinmentGraph: builder.query({
      query: (filter) => ({
        url: `vets/appointmentGraph/${filter}`,
        method: "GET",
      }),
    }),

    getPaymentGraph: builder.query({
      query: () => ({
        url: `paymentGraph`,
        method: "GET",
      }),
    }),

    getOwnerGraph: builder.query({
      query: () => ({
        url: `ownerGraph`,
        method: "GET",
      }),
    }),

    getVetsOwnerGraph: builder.query({
      query: (id) => ({
        url: `vets/ownersAgeGraph/${id}`,
        method: "GET",
      }),
    }),

    getPendingAppoinment: builder.query({
      query: () => ({
        url: `pendingAppointments`,
        method: "GET",
      }),
    }),

    getVetsPendingAppoinment: builder.query({
      query: (id) => ({
        url: `vets/pendingAppointments/${id}`,
        method: "GET",
      }),
    }),

    getVetsMothlyMetrics: builder.query({
      query: (id) => ({
        url: `vets/monthlyMetrics/${id}`,
        method: "GET",
      }),
    }),

    getVetsAppointmentsByDate: builder.query({
      query: (filter) => ({
        url: `vets/appointmentsByDate/${filter}`,
      }),
    }),
  }),
});

export const {
  useGetMetricsQuery,
  useGetAppoinmentGraphQuery,
  useGetVetsAppoinmentGraphQuery,
  useGetVetsOwnerGraphQuery,
  useGetVetsPendingAppoinmentQuery,
  useGetVetsMothlyMetricsQuery,
  useGetPaymentGraphQuery,
  useGetOwnerGraphQuery,
  useGetPendingAppoinmentQuery,
  useGetVetsAppointmentsByDateQuery,
} = dashboardApi;

export const veterinaApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER_URL}/veterinarian/`,
    prepareHeaders: (headers, { getState }) => {
      const cookies = document.cookie.split(";");
      let jwtCookie = null;

      cookies.map((cookie) => {
        if (cookie.includes("authToken=")) {
          jwtCookie = "Bearer " + cookie.split("authToken=")[1];
        }
        return null;
      });

      if (jwtCookie) {
        headers.set("authorization", jwtCookie);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSpecialities: builder.query({
      query: () => ({
        url: `specialityList`,
        method: "GET",
      }),
    }),

    getSpecialityList: builder.query({
      query: () => ({
        url: `veterinarianBySpeciality`,
        method: "GET",
      }),
    }),

    getSingleSpeciality: builder.query({
      query: (id) => ({
        url: `singleSpeciality/${id}`,
        method: "GET",
      }),
    }),

    getVeterinariansAppointment: builder.query({
      query: (id) => ({
        url: `singleVeterinarianAppointment/${id ? id : ""}`,
        methodL: "GET",
      }),
    }),

    getPetsByVeterinarian: builder.query({
      query: (filter) => ({
        url: `vets/petsByVeterinarian${filter}`,
        method: "GET",
      }),
    }),
    getOwnersByVeterinarian: builder.query({
      query: (filter) => ({
        url: `vets/ownersByVeterinarian${filter}`,
        method: "GET",
      }),
    }),

    addSpeciality: builder.mutation({
      query: (body) => ({
        url: `createSpeciality`,
        method: "POST",
        body: body,
      }),
    }),

    editSpecialty: builder.mutation({
      query: (body) => ({
        url: `UpdateSpeciality/${body.id}`,
        method: "PUT",
        body: body,
      }),
    }),
    removeSpeciality: builder.mutation({
      query: (body) => ({
        url: `specialityRemove/${body.id}`,
        method: "DELETE",
        body: body,
      }),
    }),

    getVeterinarians: builder.query({
      query: () => ({
        url: `veterinariansList`,
        method: "GET",
      }),
    }),
    getVeterinariansFilter: builder.query({
      query: (filter) => ({
        url: `veterinariansFilter${filter}`,
        method: "GET",
      }),
    }),
    getSingleVeterin: builder.query({
      query: (id) => ({
        url: `singleVeterinarian/${id}`,
        method: "GET",
      }),
    }),
    removeVeterine: builder.mutation({
      query: (body) => ({
        url: `veterinarianRemove/${body.id}`,
        method: "DELETE",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetSpecialitiesQuery,
  useGetVeterinariansQuery,
  useGetSingleVeterinQuery,
  useGetSpecialityListQuery,
  useGetSingleSpecialityQuery,
  useGetPetsByVeterinarianQuery,
  useGetVeterinariansFilterQuery,
  useGetOwnersByVeterinarianQuery,
  useGetVeterinariansAppointmentQuery,
  useEditSpecialtyMutation,
  useAddSpecialityMutation,
  useRemoveSpecialityMutation,
  useRemoveVeterineMutation,
} = veterinaApi;

export const appoinmentApi = createApi({
  reducerPath: "appoinmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER_URL}/appointment/`,
    prepareHeaders: (headers, { getState }) => {
      const cookies = document.cookie.split(";");
      let jwtCookie = null;

      cookies.map((cookie) => {
        if (cookie.includes("authToken=")) {
          jwtCookie = "Bearer " + cookie.split("authToken=")[1];
        }
        return null;
      });

      if (jwtCookie) {
        headers.set("authorization", jwtCookie);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllAppoinments: builder.query({
      query: () => ({
        url: `allAppointments`,
        method: "GET",
      }),
    }),

    getSingleAppointment: builder.query({
      query: (id) => ({
        url: `singleAppointment/${id}`,
        method: "GET",
      }),
    }),

    getAppointmentFilter: builder.query({
      query: (filter) => ({
        url: `appointmentFilter${filter}`,
        method: "GET",
      }),
    }),

    getAppointmentByDate: builder.query({
      query: () => ({
        url: `dateWiseAppointments`,
        method: "GET",
      }),
    }),

    getAppoinmentByDoctor: builder.query({
      query: (id) => ({
        url: `/appointmentsOfDoctor/${id}`,
        method: "GET",
      }),
    }),

    addAppoinment: builder.mutation({
      query: (body) => ({
        url: `scheduleAppointment`,
        method: "POST",
        body: body,
      }),
    }),

    updateAppointment: builder.mutation({
      query: (body) => ({
        url: `updateAppointment/${body.id}`,
        method: "PUT",
        body: body,
      }),
    }),

    registerDiagnostic: builder.mutation({
      query: (body) => ({
        url: `registerDiagnostic/${body.id}`,
        method: "PUT",
        body: body,
      }),
    }),

    removeAppointment: builder.mutation({
      query: (body) => ({
        url: `appointmentRemove/${body.id}`,
        method: "DELETE",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetAllAppoinmentsQuery,
  useGetSingleAppointmentQuery,
  useGetAppointmentByDateQuery,
  useGetAppointmentFilterQuery,
  useGetAppoinmentByDoctorQuery,
  useAddAppoinmentMutation,
  useUpdateAppointmentMutation,
  useRegisterDiagnosticMutation,
  useRemoveAppointmentMutation,
} = appoinmentApi;

export const ownersApi = createApi({
  reducerPath: "ownerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER_URL}/owner/`,
    prepareHeaders: (headers, { getState }) => {
      const cookies = document.cookie.split(";");
      let jwtCookie = null;

      cookies.map((cookie) => {
        if (cookie.includes("authToken=")) {
          jwtCookie = "Bearer " + cookie.split("authToken=")[1];
        }
        return null;
      });

      if (jwtCookie) {
        headers.set("authorization", jwtCookie);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getOwnersList: builder.query({
      query: () => ({
        url: `ownersList`,
        method: "GET",
      }),
    }),
    ownerFilter: builder.query({
      query: (filter) => ({
        url: `ownerFilter${filter}`,
        method: "GET",
      }),
    }),
    getSingleOwner: builder.query({
      query: (id) => ({
        url: `singleOwner/${id}`,
        method: "GET",
      }),
    }),
    getPetByOwner: builder.query({
      query: (id) => ({
        url: `petListByOwner/${id}`,
        method: "GET",
      }),
    }),

    getPetAppoinmentOfOwner: builder.query({
      query: (id) => ({
        url: `petAppointmentsOfOwner/${id}`,
        method: "GET",
      }),
    }),

    addOwner: builder.mutation({
      query: (body) => ({
        url: `createOwner`,
        method: "POST",
        body: body,
      }),
    }),
    editOwner: builder.mutation({
      query: (body) => ({
        url: `updateOwner/${body.id}`,
        method: "PUT",
        body: body,
      }),
    }),
    removeOwner: builder.mutation({
      query: (body) => ({
        url: `ownerRemove/${body.id}`,
        method: "DELETE",
        body: body,
      }),
    }),
  }),
});

export const {
  useOwnerFilterQuery,
  useGetOwnersListQuery,
  useGetPetByOwnerQuery,
  useGetSingleOwnerQuery,
  useGetPetAppoinmentOfOwnerQuery,
  useAddOwnerMutation,
  useEditOwnerMutation,
  useRemoveOwnerMutation,
} = ownersApi;

export const petApi = createApi({
  reducerPath: "PetApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER_URL}/pet/`,
    prepareHeaders: (headers, { getState }) => {
      const cookies = document.cookie.split(";");
      let jwtCookie = null;

      cookies.map((cookie) => {
        if (cookie.includes("authToken=")) {
          jwtCookie = "Bearer " + cookie.split("authToken=")[1];
        }
        return null;
      });

      if (jwtCookie) {
        headers.set("authorization", jwtCookie);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllPets: builder.query({
      query: () => ({
        url: `petsList`,
        method: "GET",
      }),
    }),

    petFilter: builder.query({
      query: (filter) => ({
        url: `petFilter${filter}`,
        method: "GET",
      }),
    }),
    petSummaryPdf: builder.query({
      query: (filter) => ({
        url: `petSummaryPdf/${filter}`,
        method: "GET",
      }),
    }),

    getSinglePet: builder.query({
      query: (id) => ({
        url: `singlePet/${id}`,
        method: "GET",
      }),
    }),

    getPetExcelSheet: builder.query({
      query: () => ({
        url: `petExcelFile`,
        method: "GET",
      }),
    }),

    getPetAppoinment: builder.query({
      query: (filter) => ({
        url: `petAppointment/${filter}`,
        method: "GET",
      }),
    }),

    addPet: builder.mutation({
      query: (body) => ({
        url: `createPet`,
        method: "POST",
        body: body,
      }),
    }),

    updatePet: builder.mutation({
      query: (body) => ({
        url: `petUpdate/${body.id}`,
        method: "PUT",
        body: body,
      }),
    }),
    removePet: builder.mutation({
      query: (body) => ({
        url: `petRemove/${body.id}`,
        method: "DELETE",
        body: body,
      }),
    }),
  }),
});

export const {
  usePetFilterQuery,
  useGetAllPetsQuery,
  useGetSinglePetQuery,
  useGetPetExcelSheetQuery,
  useGetPetAppoinmentQuery,
  useAddPetMutation,
  useUpdatePetMutation,
  useRemovePetMutation,
  usePetSummaryPdfQuery
} = petApi;

export const vaccinationApi = createApi({
  reducerPath: "VaccinationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER_URL}/vaccination/`,
    prepareHeaders: (headers, { getState }) => {
      const cookies = document.cookie.split(";");
      let jwtCookie = null;

      cookies.map((cookie) => {
        if (cookie.includes("authToken=")) {
          jwtCookie = "Bearer " + cookie.split("authToken=")[1];
        }
        return null;
      });

      if (jwtCookie) {
        headers.set("authorization", jwtCookie);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllVaccinationList: builder.query({
      query: () => ({
        url: `vaccinationList`,
        method: "GET",
      }),
    }),

    getVaccinationbyVaccineId: builder.query({
      query: (id) => ({
        url: `vaccinationById/${id}`,
        method: "GET",
      }),
    }),
    getSinglePetVaccinationDetails: builder.query({
      query: (id) => ({
        url: `petVaccination/${id}`,
        method: "GET",
      }),
    }),

    addVaccination: builder.mutation({
      query: (body) => ({
        url: `createVaccination`,
        method: "POST",
        body: body,
      }),
    }),

    addVaccinationRecord: builder.mutation({
      query: (body) => ({
        url: `createVaccinationRecord/${body.id}`,
        method: "POST",
        body: {
          vaccine: body.vaccine,
          vaccineId: body.vaccineId,
        },
      }),
    }),

    updateVaccination: builder.query({
      query: (body) => ({
        url: `updateVaccination/${body.id}`,
        method: "PUT",
        body: body,
      }),
    }),

    updateVaccinationStatus: builder.mutation({
      query: (body) => ({
        url: `updateVaccinationStatus/${body.id}`,
        method: "PUT",
        body: {
          status: body.status,
        },
      }),
    }),

    updateVaccinationValidity: builder.mutation({
      query: (body) => ({
        url: `updateVaccinationValidity/${body.id}`,
        method: "PUT",
        body: body,
      }),
    }),
    removeVaccination: builder.mutation({
      query: (body) => ({
        url: `deleteVaccinationRecord/${body.id}`,
        method: "DELETE",
        body: body,
      }),
    }),
  }),
});
export const {
  useUpdateVaccinationQuery,
  useGetAllVaccinationListQuery,
  useGetVaccinationbyVaccineIdQuery,
  useGetSinglePetVaccinationDetailsQuery,
  useAddVaccinationMutation,
  useRemoveVaccinationMutation,
  useAddVaccinationRecordMutation,
  useUpdateVaccinationStatusMutation,
  useUpdateVaccinationValidityMutation,
} = vaccinationApi;

export const vaccineApi = createApi({
  reducerPath: "VaccineApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER_URL}/vaccine/`,
    prepareHeaders: (headers, { getState }) => {
      const cookies = document.cookie.split(";");
      let jwtCookie = null;

      cookies.map((cookie) => {
        if (cookie.includes("authToken=")) {
          jwtCookie = "Bearer " + cookie.split("authToken=")[1];
        }
        return null;
      });

      if (jwtCookie) {
        headers.set("authorization", jwtCookie);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllVaccines: builder.query({
      query: () => ({
        url: `vaccineList`,
        method: "GET",
      }),
    }),
    getAllVaccinesByFilter: builder.query({
      query: (filter) => ({
        url: `vaccineFilter${filter}`,
        method: "GET",
      }),
    }),
    getSingleVaccine: builder.query({
      query: (id) => ({
        url: `singleVaccine/${id}`,
        method: "GET",
      }),
    }),

    addVaccine: builder.mutation({
      query: (body) => ({
        url: `createVaccine`,
        method: "POST",
        body: body,
      }),
    }),
    updateVaccine: builder.mutation({
      query: (body) => ({
        url: `updateVaccine/${body.id}`,
        method: "PUT",
        body: body,
      }),
    }),
    removeVaccine: builder.mutation({
      query: (body) => ({
        url: `vaccineRemove/${body.id}`,
        method: "DELETE",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetAllVaccinesQuery,
  useGetSingleVaccineQuery,
  useGetAllVaccinesByFilterQuery,
  useAddVaccineMutation,
  useUpdateVaccineMutation,
  useRemoveVaccineMutation,
} = vaccineApi;

export const inventoryApi = createApi({
  reducerPath: "inventoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER_URL}/product/`,
    prepareHeaders: (headers, { getState }) => {
      const cookies = document.cookie.split(";");
      let jwtCookie = null;

      cookies.map((cookie) => {
        if (cookie.includes("authToken=")) {
          jwtCookie = "Bearer " + cookie.split("authToken=")[1];
        }
        return null;
      });

      if (jwtCookie) {
        headers.set("authorization", jwtCookie);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getALlProductList: builder.query({
      query: (filter) => ({
        url: `productFilter${filter}`,
        method: "GET",
      }),
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `singleProduct/${id}`,
        method: "GET",
      }),
    }),

    getProductHistory: builder.query({
      query: (id) => ({
        url: `productHistory/${id}`,
        method: "GET",
      }),
    }),

    addProduct: builder.mutation({
      query: (body) => ({
        url: `createProduct`,
        method: "POST",
        body: body,
      }),
    }),

    updateProduct: builder.mutation({
      query: (body) => ({
        url: `UpdateProduct/${body.id}`,
        method: "PUT",
        body: body,
      }),
    }),

    updateStock: builder.mutation({
      query: (body) => ({
        url: `UpdateStock/${body.id}`,
        method: "PUT",
        body: body,
      }),
    }),

    removeProduct: builder.mutation({
      query: (body) => ({
        url: `productRemove/${body.id}`,
        method: "DELETE",
        body: body,
      }),
    }),

    //  Category API
    getAllCategories: builder.query({
      query: () => ({
        url: `categoriesList`,
        method: "GET",
      }),
    }),

    getCategoryWithProducts: builder.query({
      query: () => ({
        url: `productCount`,
        method: "GET",
      }),
    }),

    getSingleCategory: builder.query({
      query: (id) => ({
        url: `singleCategory/${id}`,
        method: "GET",
      }),
    }),

    addCategory: builder.mutation({
      query: (body) => ({
        url: `createCategory`,
        method: "POST",
        body: body,
      }),
    }),

    updateCategory: builder.mutation({
      query: (body) => ({
        url: `UpdateCategory/${body.id}`,
        method: "PUT",
        body: body,
      }),
    }),

    removeCategory: builder.mutation({
      query: (body) => ({
        url: `categoryRemove/${body.id}`,
        method: "DELETE",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetSingleProductQuery,
  useGetAllCategoriesQuery,
  useGetALlProductListQuery,
  useGetProductHistoryQuery,
  useGetSingleCategoryQuery,
  useGetCategoryWithProductsQuery,
  useAddProductMutation,
  useUpdateStockMutation,
  useAddCategoryMutation,
  useRemoveProductMutation,
  useUpdateProductMutation,
  useUpdateCategoryMutation,
  useRemoveCategoryMutation,
} = inventoryApi;

export const paymentApi = createApi({
  reducerPath: "PaymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER_URL}/payment/`,
    prepareHeaders: (headers, { getState }) => {
      const cookies = document.cookie.split(";");
      let jwtCookie = null;

      cookies.map((cookie) => {
        if (cookie.includes("authToken=")) {
          jwtCookie = "Bearer " + cookie.split("authToken=")[1];
        }
        return null;
      });

      if (jwtCookie) {
        headers.set("authorization", jwtCookie);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllPaymentList: builder.query({
      query: () => ({
        url: `paymentsList`,
        method: "GET",
      }),
    }),
    getAllPaymentFilter: builder.query({
      query: (filter) => ({
        url: `paymentFilter${filter}`,
        method: "GET",
      }),
    }),
    getSinglePayment: builder.query({
      query: (id) => ({
        url: `singlePayment/${id}`,
        method: "GET",
      }),
    }),

    addPayment: builder.mutation({
      query: (body) => ({
        url: `paymentRegistration`,
        method: "POST",
        body: body,
      }),
    }),

    updatePayment: builder.mutation({
      query: (body) => ({
        url: `paymentUpdate/${body.id}`,
        method: "PUT",
        body: body,
      }),
    }),

    removePayment: builder.mutation({
      query: (body) => ({
        url: `paymentRemove/${body.id}`,
        method: "DELETE",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetSinglePaymentQuery,
  useGetAllPaymentListQuery,
  useGetAllPaymentFilterQuery,
  useAddPaymentMutation,
  useUpdatePaymentMutation,
  useRemovePaymentMutation,
} = paymentApi;
