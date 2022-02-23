import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSpecificationsCars1645627547143 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "specifications_cars",
            columns: [
                {
                    name: "car_id",
                    type: "uuid"
                },
                {
                    name: "car_id",
                    type: "uuid"
                }
            ]
        }))    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
