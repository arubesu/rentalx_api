import { Expose } from 'class-transformer';
import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  driver_license: string;

  @Column()
  avatar_url: string;

  @Column()
  isAdmin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @Expose({ name: 'avatar_public_url' })
  avatar_public_url(): string {
    switch (process.env.STORAGE) {
      case 'local':
        return `${process.env.APP_BASE_URL}/avatar/${this.avatar_url}`;
      case 's3':
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar_url}`;
      default:
        return null;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { User };
