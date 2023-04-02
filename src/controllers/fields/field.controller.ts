import { Repository, EntityManager } from "typeorm";
import { FieldsEntity } from "../../db/entities/fields.entity";
import { ServerRoute } from "@hapi/hapi";

export const fieldsController = (conn: EntityManager): ServerRoute[] => {
    const fieldsRepo: Repository<FieldsEntity> = conn.getRepository(FieldsEntity);

    return [
        {
            method: "GET",
            path: "/fields",
            handler: async (request, h) => {
                return await fieldsRepo.find();
            }
        },
        {
            method: "GET",
            path: "/fields/{id}",
            handler: async (request, h) => {
                const result = await fieldsRepo.findOne(request.params.id);
                if (!result) {
                    return h.response({ message: "Fields not found" }).code(404);
                }
                return result;
            }
        }
    ];
}