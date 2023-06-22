import { Column } from 'typeorm';

export class Location {
  @Column({ type: 'double precision' })
  latitude: number;

  @Column({ type: 'double precision' })
  longitude: number;
}