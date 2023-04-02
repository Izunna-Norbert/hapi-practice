import { Repository, EntityManager } from 'typeorm';
import { TemplateEntity } from '../../db/entities/template.entity';
import { ServerRoute } from '@hapi/hapi';

export const templateController = (conn: EntityManager): ServerRoute[] => {
  const templateRepo: Repository<TemplateEntity> = conn.getRepository(TemplateEntity);

  return [
    {
      method: 'GET',
      path: '/templates',
      handler: async (request, h) => {
        // return fields for each template, return select fields
        return await templateRepo
          .createQueryBuilder('templates')
          .leftJoinAndSelect('templates.fields', 'fields')
          .select([
            'templates.id',
            'templates.title',
            'templates.description',
            'fields.id',
            'fields.label',
            'fields.type',
            'fields.required',
            'fields.placeholder',
          ])
          .getMany();
      },
    },
    {
      method: 'GET',
      path: '/templates/{id}',
      handler: async (request, h) => {
        const result = await templateRepo
          .createQueryBuilder('templates')
          .leftJoinAndSelect('templates.fields', 'fields')
          .select([
            'templates.id',
            'templates.title',
            'templates.description',
            'fields.id',
            'fields.label',
            'fields.type',
            'fields.required',
            'fields.placeholder',
          ])
          .where('templates.id = :id', { id: request.params.id })
          .getOne();
        if (!result) {
          return h.response({ message: 'Template not found' }).code(404);
        }
        return result;
      },
    },
  ];
};
