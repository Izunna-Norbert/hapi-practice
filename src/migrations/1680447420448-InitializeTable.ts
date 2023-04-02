import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitializeTable1680447420448 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE templates (
            id VARCHAR(255) PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255)
        );

        CREATE TABLE fields (
            uuid SERIAL PRIMARY KEY,
            id VARCHAR(255) NOT NULL,
            template_id VARCHAR(255) NOT NULL,
            label VARCHAR(255) NOT NULL,
            type VARCHAR(255) NOT NULL,
            placeholder VARCHAR(255),
            required BOOLEAN NOT NULL,
            FOREIGN KEY (template_id) REFERENCES templates(id)
          );

        INSERT INTO templates (id, title, description)
        VALUES ('example-template', 'Template di esempio', 'Questo è un template di esempio'),
               ('newsletter-subscription', 'Sottoscrizione Newsletter', 'Iscriviti alla nostra newsletter per ricevere aggiornamenti e promozioni esclusive!');

        INSERT INTO fields (id, template_id, label, type, placeholder, required)
        VALUES ('first_name', 'example-template', 'Nome', 'text', 'Inserisci il tuo nome', true),
               ('last_name', 'example-template', 'Cognome', 'text', 'Inserisci il tuo cognome', true),
               ('email', 'example-template', 'Email', 'email', 'Inserisci la tua email', true),
               ('submit', 'example-template', 'Invia', 'submit', NULL, false),
               ('name', 'newsletter-subscription', 'Nome', 'text', 'Inserisci il tuo nome', true),
               ('email', 'newsletter-subscription', 'Indirizzo email', 'email', 'Inserisci la tua email', true),
               ('accept_terms', 'newsletter-subscription', 'Accetto i termini e le condizioni', 'checkbox', NULL, true),
               ('submit', 'newsletter-subscription', 'Iscriviti', 'submit', NULL, false);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE fields;
        DROP TABLE templates;
    `);
  }
}
