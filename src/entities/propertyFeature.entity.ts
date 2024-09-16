    import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
  import { Property } from "./property.entity";

    @Entity()
    export class PropertyFeature {
      @PrimaryGeneratedColumn()
      id: number
      
      @Column({ type: "integer" })
      bedrooms: number
      
      @Column({ type: "integer" })
      bathrooms: number

      @Column({ type: "integer" })
      parkingSpots: number

      @Column({ type: "integer" })
      area: number;

      @Column({type:"boolean"})
      hasBalcony: boolean;

      @Column({type:"boolean"})
      hasGardenYard: boolean;

      @Column({type:"boolean"})
      hasSwimmingPool: boolean;

      @OneToOne(() => Property,(property) => property.propertyFeature)
      @JoinColumn()
      property:Property

    }