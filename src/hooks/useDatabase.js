import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { LABELS } from '../graphql/labels';
import { SUBJECTS } from '../graphql/subjects';
import { ROLES } from '../graphql/roles';

const useDatabase = () => {
  const [labels, setLabels] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [roles, setRoles] = useState([]);

  const { data: labelsData, loading: labelsLoading, error: labelsError } = useQuery(LABELS);
  const { data: subjectsData, loading: subjectsLoading, error: subjectsError } = useQuery(SUBJECTS);
  const { data: rolesData, loading: rolesLoading, error: rolesError } = useQuery(ROLES);

  useEffect(() => {
    labelsData && setLabels(labelsData.labels);
    subjectsData && setSubjects(subjectsData.subjects);
    rolesData && setRoles(rolesData.roles);
  }, [labelsData, subjectsData, rolesData]);

  useEffect(() => {
    labelsError && console.error(labelsError);
    subjectsError && console.error(subjectsError);
    rolesError && console.error(rolesError);
  }, [labelsError, subjectsError, rolesError]);

  return {
    labels: labels,
    subjects: subjects,
    roles: roles,

    loading: labelsLoading || subjectsLoading || rolesLoading,
  };
};

export default useDatabase;
