import Kirby from "../interfaces/ServerKirby.ts";
import * as uuid from "https://deno.land/std@0.175.0/uuid/mod.ts";
import KirbyModel from "../models/kirby.ts";

const Event = Object({
  status: String,
  body:Object({
    success: Boolean,
    data: Array(Object({
      id: Number,
      event: String,
      isCompleted: Boolean
    }))
  })
});

export default {
  getAllEvents: async ({ response }: { response: any }) => {
    try {
      const data = await KirbyModel.getAll();
      response.status = 200;
      response.body = {
        success: true,
        data,
      };
    } catch (error) {
      response.status = 400;
      response.body = {
        success: false,
        message: `Error: ${error}`,
      };
    }
  },
  createEvent: async ({ request, response }: { request: any; response: any },) => {
    const body = await request.body();
    const value = await body.value

    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        message: "No data provided",
      };
      return;
    }

    try {
      await KirbyModel.add(
        { event: value.event, isCompleted: false, date: value.date },
      );

      response.body = {
        success: true,
        message: "The record was added successfully",
      };
    } catch (error) {
      response.status = 400;
      response.body = {
        success: false,
        message: `Error: ${error}`,
      };
    }
  },
  getEventById: async (
    { params, response }: { params: { id: string }; response: any },
  ) => {
    try {
      const isAvailable = await KirbyModel.doesExistById(
        { id: Number(params.id) },
      );

      if (!isAvailable) {
        response.status = 404;
        response.body = {
          success: false,
          message: "No todo found",
        };
        return;
      }

      const event = await KirbyModel.getById({ id: Number(params.id) });
      response.status = 200;
      response.body = {
        success: true,
        data: event,
      };
    } catch (error) {
      response.status = 400;
      response.body = {
        success: false,
        message: `Error: ${error}`,
      };
    }},
  updateEventById: async ( { params, request, response }: {params: { id: string },request: any,response: any,},) => {
    const isAvailable = await KirbyModel.doesExistById(
      { id: Number(params.id) },
    );

    if (!isAvailable) {
      response.status = 404;
      response.body = {
        success: false,
        message: "No todo found",
      };
      return;
    }

    const body = await request.body()
    const value = await body.value
    
  },
  deleteEventById: ({ params, response }: { params: { id: string }; response: any },) => {},
};


