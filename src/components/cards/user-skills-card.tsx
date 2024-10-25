interface UserSkillCard {
  userSkills: string[]
}

export const UserSkillsCard: React.FC<UserSkillCard> = ({ userSkills }) => {
  return <div>User Skills Card</div>
}
