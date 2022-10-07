import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import storeApi from 'api/storeApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import Page from 'components/Page';
import { selectFilter } from 'features/pois-brand/poiBrandSlice';
import useSettings from 'hooks/useSettings';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { PostStore, Store } from 'models';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { PATH_DASHBOARD } from 'routes/paths';
import { getCurrentUser } from 'utils/common';
import StoreForm from '../components/StoreForm';
import { storeActions } from '../storeSlice';
import './style.css';

interface AddEditStorePageProps {}
// const ThumbImgStyle = styled('img')(({ theme }) => ({
//   width: 300,
//   height: 300,
//   objectFit: 'cover',
//   margin: theme.spacing(0, 2),
//   borderRadius: theme.shape.borderRadiusSm,
// }));

export default function AddEditStorePage(props: AddEditStorePageProps) {
  const { storeId } = useParams();
  const isEdit = Boolean(storeId);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { themeStretch } = useSettings();
  const [store, setStore] = useState<PostStore>();
  const [location, setLocation] = useState<LatLngExpression>();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const filter = useAppSelector(selectFilter);
  const user = getCurrentUser();
  useEffect(() => {
    dispatch(storeActions.fetchStoreType());
  }, [dispatch]);
  useEffect(() => {
    if (!storeId) return;

    // IFFE
    (async () => {
      try {
        const data: Store = await storeApi.getStoreById(storeId);

        let postLocation: string = '';
        if (data?.geom?.coordinates) {
          const detailsLocation: LatLngExpression = [
            data?.geom?.coordinates[1],
            data?.geom?.coordinates[0],
          ];

          postLocation = `${data?.geom?.coordinates[0]} ${data?.geom?.coordinates[1]}`;
          setLocation(detailsLocation);
        }
        const newValue: PostStore = {
          id: data?.id,
          address: data?.address || '',
          name: data?.name || '',
          imageUrl: data?.imageUrl || '',
          coordinateString: postLocation,
          storeCode: data?.storeCode || '',
          storeTypeId: data?.storeTypeId || 0,
        };
        setStore(newValue);
        // eslint-disable-next-line no-empty
      } catch (error) {}
    })();
  }, [storeId]);
  const handelStoreFormSubmit = async (formValues: PostStore) => {
    if (!isEdit) {
      try {
        if (!user) return;
        await storeApi.add(formValues);
        enqueueSnackbar(`${formValues?.name} ${t('store.addSuccess')}`, { variant: 'success' });
        const newFilter = { ...filter };
        dispatch(storeActions.setFilter(newFilter));
        navigate(PATH_DASHBOARD.store.root);
      } catch (error) {
        enqueueSnackbar(
          `${formValues?.name} ${t('common.errorText')} ,${t('store.storeCodeIsExisted')}`,
          { variant: 'error' }
        );
      }
    } else {
      try {
        if (!user) return;
        await storeApi.update(Number(storeId), formValues);
        enqueueSnackbar(
          `${t('store.updateSuccessStart') + formValues.name} ${t('store.updateSuccessEnd')}`,
          { variant: 'success' }
        );
        const newFilter = { ...filter };
        dispatch(storeActions.setFilter(newFilter));
        navigate(PATH_DASHBOARD.store.root);
      } catch (error) {
        enqueueSnackbar(
          `${formValues?.name} ${t('common.errorText')} ,${t('store.storeCodeIsExisted')}`,
          { variant: 'error' }
        );
      }
    }
  };
  const initialValues: PostStore = {
    name: '',
    address: '',
    coordinateString: '',
    storeCode: '',
    storeTypeId: 0,
    brandId: user?.brandId,
    imageUrl: '',
    ...store,
  } as PostStore;

  const links = [
    { name: 'Dashboard', href: PATH_DASHBOARD.root },
    { name: t('store.title'), href: PATH_DASHBOARD.store.root },
    { name: !isEdit ? t('store.btnAdd') : t('store.editInfo') },
  ];
  if (isEdit) {
    links.push({
      name: store?.name || '',
      href: `${PATH_DASHBOARD.store.details}/${storeId}`,
    });
  }
  return (
    <Page title={!isEdit ? t('store.formAdd') : t('store.detailsStore')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? t('store.formAdd') : t('store.detailsStore')}
          links={links}
        />
        <Box>
          {(!isEdit || Boolean(store)) && (
            <StoreForm
              initialValue={initialValues}
              onSubmit={handelStoreFormSubmit}
              isEdit={isEdit}
            />
          )}
        </Box>
      </Container>
    </Page>
  );
}
