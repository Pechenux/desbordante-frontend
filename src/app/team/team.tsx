import { cmsFetchClient } from '@/api/services/cms';
import HomeBackground from '@/assets/backgrounds/home.svg?component';
import { TeamMemberBadge } from '@/components/team/TeamMemberBadge';
import styles from './team.module.scss';

export async function Team() {
  const responseTeamMembers = await cmsFetchClient.GET('/cms/team-members', {
    params: {
      query: {
        'pagination[limit]': -1,
        sort: 'displayPriority:desc,fullName:asc',
      },
    },
  });

  const teamMembers = responseTeamMembers.data?.data;

  return (
    <div className={styles.teamPage}>
      <HomeBackground
        className={styles.background}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
      />

      {teamMembers && teamMembers.length > 0 && (
        <ol className={styles.teamCardsContainer}>
          {teamMembers.map(
            ({ id, attributes }) =>
              attributes && <TeamMemberBadge data={attributes} key={id} />,
          )}
        </ol>
      )}
    </div>
  );
}
