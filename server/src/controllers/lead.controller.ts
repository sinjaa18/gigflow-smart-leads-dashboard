import { Request, Response } from "express";
import Lead from "../models/lead.model";

// create lead
export const createLead = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json({
      message: "Lead created",
      lead,
    });
  } catch (err) {
    res.status(500).json({
      message: "server error",
    });
  }
};

// get all leads
export const getLeads = async (req: Request, res: Response) => {
  try {
    const { status, source, search, sort, page = "1" } = req.query;

    const query: any = {};

    if (typeof status === "string" && status.trim() !== "") {
      query.status = status;
    }

    if (typeof source === "string" && source.trim() !== "") {
      query.source = source;
    }

    if (typeof search === "string" && search.trim() !== "") {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const limit = 10;
    const skip = (Number(page) - 1) * limit;

    let sortOption = {};

    if (sort === "latest") {
      sortOption = {
        createdAt: -1,
      };
    }

    if (sort === "oldest") {
      sortOption = {
        createdAt: 1,
      };
    }

    const leads = await Lead.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const total = await Lead.countDocuments(query);

    res.status(200).json({
      leads,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

// get single lead
export const getLead = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }
    res.status(200).json({
      lead,
    });
  } catch (err) {
    res.status(500).json({
      message: "server error",
    });
  }
};

// update
export const updateLead = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }
    res.status(200).json({
      message: "Lead updated",
      lead,
    });
  } catch (err) {
    res.status(500).json({
      message: "server error",
    });
  }
};

// delete a lead
export const deleteLead = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }
    res.status(200).json({
      message: "Lead deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: "Server errror",
    });
  }
};