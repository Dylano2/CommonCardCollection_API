export interface Timestampable {
  /**
   * Renseigne la date et heure de création de l'entité.
   * @param { Date } createdAt
   *
   * ```js
   * // Décorateur à déclarer
   * CreateDateColumn({type: "timestamp",default: () => "CURRENT_TIMESTAMP(6)"})
   *
   * ```
   *
   */
  createdAt: Date;

  /**
   * Renseigne la date et heure de la mise à jour de l'entité.
   * @param { Date } updatedAt
   *
   * ```js
   * // Décorateur à déclarer
   * UpdateDateColumn({type: "timestamp",default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
   *
   * ```
   *
   */
  updatedAt: Date;

  /**
   * Renseigne la date et heure de suppression de l'entité.
   * @param { Date } deletedAt
   *
   * ```js
   * // Décorateur à déclarer
   * DeleteDateColumn()
   *
   * ```
   *
   */
  deletedAt?: Date;
}
