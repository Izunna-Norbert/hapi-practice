import 'colors';
import { get } from 'node-emoji';
import { EntityManager } from 'typeorm';
import { FieldsEntity } from '../entities/fields.entity';
import { TemplateEntity } from '../entities/template.entity';
import { faker } from '@faker-js/faker';

export const fakeFieldsStore = async (conn: EntityManager, count: number = 10) => {
  const templateRepo = conn.getRepository(TemplateEntity);
  const fieldsRepo = conn.getRepository(FieldsEntity);
  const templates = await templateRepo.find();
  for (let i = 0; i < count; i++) {
    const fields = new FieldsEntity();
    fields.id = faker.datatype.uuid();
    fields.label = faker.lorem.sentence();
    fields.type = faker.helpers.arrayElement([
      'text',
      'number',
      'date',
      'email',
      'password',
      'checkbox',
      'radio',
      'select',
    ]);
    fields.required = faker.datatype.boolean();
    fields.placeholder = faker.lorem.sentence();
    // random template
    fields.template = templates[Math.floor(Math.random() * templates.length)];
    await fieldsRepo.save(fields);
    console.log(`${get('white_check_mark')} ${'Fields'.green} ${fields.label} ${'created'.green}`);
  }

  console.log(`${get('white_check_mark')} Created ${count} ${'Fields'.green}`);
};
