import mongoose from "mongoose";

import Service from "@classes/service.class";
import { ASchema } from "./abstract.schema";

const serviceSchema = new mongoose.Schema({
    label: { type: String, required: true },
    actions: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Action", required: true }
    ],
    reactions: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Reaction", required: true }
    ]
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

export class ServiceSchema extends ASchema<Service> {
    constructor() {
        super(Service, "Service", serviceSchema);
    }
}