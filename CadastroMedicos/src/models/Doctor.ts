// Representação de como um dado é salvo na aplicação
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'; // Um model que será salvo no banco de dados

@Entity('doctors') // insira o nome da tabela
class Doctors {
  @PrimaryGeneratedColumn('uuid') // Gera o valor automaticamente (para chaves primárias)
  id: string;

  @Column()
  name: string;

  @Column()
  crm: string;

  @Column()
  telefonefixo: string;

  @Column()
  telefonecell: string;

  @Column()
  cep: string;

  @Column('simple-array')
  especialidade: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Doctors;
