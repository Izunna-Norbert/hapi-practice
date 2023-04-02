import 'colors';
import { faker } from '@faker-js/faker';
import { get } from 'node-emoji';
import { EntityManager } from 'typeorm';
import { TemplateEntity } from '../entities/template.entity';

export const fakeTemplateStore = async (conn: EntityManager, count: number = 10) => {
    const templateRepo = conn.getRepository(TemplateEntity)
    for (let i = 0; i < count; i++) {
        const template = new TemplateEntity()
        template.id = faker.datatype.uuid()
        template.title = faker.lorem.sentence()
        template.description = faker.lorem.paragraph()
        await templateRepo.save(template)
        console.log(`${get('white_check_mark')} ${'Template'.green} ${template.title} ${'created'.green}`)
    }

    console.log(`${get('white_check_mark')} Created ${count} ${'Templates'.green}`)

}