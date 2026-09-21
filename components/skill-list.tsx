export function SkillList({
  title = "Skills",
  groups,
  tone = "desk",
}: {
  title?: string;
  groups: readonly { group: string; items: readonly string[] }[];
  tone?: "desk" | "court";
}) {
  return (
    <div className={`skill-block skill-${tone}`}>
      <p className="rooms-label">{title}</p>
      <div className="skill-groups">
        {groups.map((group) => (
          <div key={group.group}>
            <h3 className="skill-group">{group.group}</h3>
            <ul className="skill-chips">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
