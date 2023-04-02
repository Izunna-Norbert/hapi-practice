import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { FieldsEntity } from "./fields.entity";

@Entity({ name: 'templates' })
export class TemplateEntity {
    @PrimaryColumn({ length: 255 })
    id!: string

    @Column({ name: 'title', nullable: false, length: 255 })
    title!: string;

    //unrequired field
    @Column({ name: 'description', nullable: true, length: 255 })
    description!: string;

    @OneToMany(() => FieldsEntity, fields => fields.template)
    @JoinColumn({ name: 'id' })
    fields!: FieldsEntity[];
}