// modules/team/entities/teams.entity.ts

export class teamsEntityImpl {
  constructor(
    private project: any,
    private membership: any,
  ) {}

  ensureMember() {
    if (!this.membership) {
      throw new Error("Access denied");
    }
  }

  ensureAdmin() {
    if (!this.membership || this.membership.role !== "ADMIN") {
      throw new Error("Not authorized");
    }
  }

  toJSON() {
    return {
      id: this.project.id,
      name: this.project.name,
      description: this.project.description,
      photo: this.project.photo,
      createdAt: this.project.createdAt,
      role: this.membership?.role,
    };
  }
}
