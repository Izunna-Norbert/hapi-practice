import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn,  } from "typeorm";
import { TemplateEntity } from "./template.entity";

@Entity({ name: 'fields' })
export class FieldsEntity {

    @PrimaryGeneratedColumn({ name: 'uuid' })
    uuid!: string
    
    @Column({ name: 'id', nullable: false, length: 255 })
    id!: string

    @Column({ name: 'label', nullable: false, length: 255 })
    label!: string;

    @Column({ name: 'type', nullable: false, length: 255 })
    type!: string;

    @Column({ name: 'required', default: false, nullable: false })
    required!: boolean;

    //unrequired field
    @Column({ name: 'placeholder', nullable: true, length: 255 })
    placeholder!: string;

    @ManyToOne(() => TemplateEntity, template => template.fields)
    @JoinColumn({ name: 'template_id' })
    template!: TemplateEntity;

    @Column({ name: 'template_id', nullable: false, length: 255 })
    templateId!: string;
}