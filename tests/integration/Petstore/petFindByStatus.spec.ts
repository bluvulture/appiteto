import {
    expect,
    StatusCodes,
    describe,
    it,
    getEnv,
    Pet,
    GetRequest,
    HttpRequest,
    RequestValidator
  } from "src/common/imports";
  
  import { PET_STATUSES, API_ENDPOINTS } from "src/common/consts";
  
  const ENV_CONFIG = getEnv();
    
  const environment = ENV_CONFIG.URL;
  const endpoint = API_ENDPOINTS.petFindByStatus;
  
  describe(`GET /pet/findByStatus`, () => {
    const statuses = Object.values(PET_STATUSES);
  
    statuses.forEach((status) => {
      describe(`find pets with status ${status}`, () => {
        let response: any;
  
        before(async () => {
          const request: HttpRequest = new GetRequest({ environment, endpoint });
          request.req.query({ status });
  
          try {
            response = await request.send();
          } catch (error) {
            console.log(`Error occurred while sending request: ${error}`);
            throw error;
          }
        });
  
        it("responds with json @test @petstore", async () => {
          try {
            new RequestValidator(response)
              .validateStatusCode(StatusCodes.OK)
              .validateContentType("application/json");
          } catch (error) {
            console.log(`Error occurred while validating response: ${error}`);
            throw error;
          }
        });
  
        it("has content within response @test @petstore", async () => {
          try {
            new RequestValidator(response)
              .validateStatusCode(StatusCodes.OK)
              .validateContentType("application/json");
  
            const respJson = response.body.map((pet: Pet) => pet.status);
  
            expect(respJson.length).to.be.greaterThan(0);
          } catch (error) {
            console.log(`Error occurred while validating response content: ${error}`);
            throw error;
          }
        });
      });
    });
  
    describe(`find pets with invalid status`, () => {
      let response: any;
  
      before(async () => {
        const request: HttpRequest = new GetRequest({ environment, endpoint });
        request.req.query({ status: "invalid" });
  
        try {
          response = await request.send();
        } catch (error) {
          console.log(`Error occurred while sending request: ${error}`);
          throw error;
        }
      });
  
      it("responds with bad request error @test @petstore", async () => {
        try {
          new RequestValidator(response)
            .validateStatusCode(StatusCodes.BAD_REQUEST)
            .validateContentType("application/json");
        } catch (error) {
          console.log(`Error occurred while validating response: ${error}`);
          throw error;
        }
      });
  
      it("has no content within response @test @petstore", async () => {
        try {
          new RequestValidator(response)
            .validateStatusCode(StatusCodes.BAD_REQUEST)
            .validateContentType("application/json");
  
          const respJson = response.body.map((pet: Pet) => pet.status);
  
          expect(respJson.length).to.be.lessThan(1);
        } catch (error) {
          console.log(`Error occurred while validating response content: ${error}`);
          throw error;
        }
      });
    });
  });
  