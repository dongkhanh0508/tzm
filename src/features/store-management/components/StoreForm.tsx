import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppSelector } from 'app/hooks';
import InputField from 'components/FormField/InputField';
import SelectField from 'components/FormField/SelectField';
import { Address, PostStore } from 'models';
import { useForm, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { LatLngExpression } from 'leaflet';
import { MapDraggable, SearchAddress, useDebouncedCallback } from 'components/common';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputAreaField from 'components/FormField/InputAreaField';
import arrowCircleLeftOutline from '@iconify/icons-eva/arrow-circle-left-outline';
import saveFill from '@iconify/icons-eva/save-fill';
import { Icon } from '@iconify/react';
import { PATH_DASHBOARD } from 'routes/paths';
import { useNavigate } from 'react-router';
import { styled } from '@mui/material/styles';
import Images from 'constants/image';
import { IconMyStore } from 'components/map/MarkerStyles';
import { selectStoreTypeOptions } from '../storeSlice';

interface StoreFormProps {
  initialValue: PostStore;
  onSubmit?: (formValue: PostStore) => void;
  isEdit: boolean;
  isView?: boolean;
}
const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 300,
  height: 300,
  objectFit: 'cover',
  margin: theme.spacing(0, 2),
  borderRadius: theme.shape.borderRadiusSm,
}));
export default function StoreForm({ initialValue, onSubmit, isEdit, isView }: StoreFormProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [imgLink, setImglink] = useState<string>(initialValue.imageUrl || Images.DEFAULT_IMG);
  const [location, setLocation] = useState<LatLngExpression>();
  // schema
  const schema = yup.object().shape({
    name: yup.string().required(t('store.errorStoreName')),
    imageUrl: yup.string().required(t('store.errorImg')),
    coordinateString: yup.string().required(t('store.errorLocation')),
    address: yup.string().required(t('store.errorAddress')),
    storeCode: yup.string().required(t('store.errorStoreCode')),
    storeTypeId: yup
      .number()
      .typeError(t('common.isRequired'))
      .moreThan(0, t('store.errorStoreType'))
      .required(t('store.errorStoreType')),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<any>({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });
  const { isDirty } = useFormState({ control });
  const storeTypeOptions = useAppSelector(selectStoreTypeOptions);
  const handelFormSubmit = (formValues: PostStore) => {
    if (onSubmit) onSubmit(formValues);
  };
  const handelInputFieldImgChange = useDebouncedCallback((e) => {
    setImglink(e.target.value);
  }, 500);

  useEffect(() => {
    if (!location) return;
    setValue('coordinateString', `${location[1].toString()} ${location[0].toString()}`, {
      shouldDirty: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  const handelSelectLocation = (address: Address) => {
    setLocation(address?.latlng);
  };
  const handelOnDragMarker = (point: any) => {
    // setLocationSelected(point['lng'].toString() + ' ' + point['lat'].toString());
    const latLng: LatLngExpression = [point.lat, point.lng];
    setLocation(latLng);
  };
  return (
    <form onSubmit={handleSubmit(handelFormSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom marginBottom={2}>
                {t('store.info')}
              </Typography>
              <Stack spacing={2}>
                <InputField
                  name="storeCode"
                  label={`${t('store.storeCode')}*`}
                  control={control}
                  disabled={isView}
                />
                <InputField
                  name="name"
                  label={`${t('store.storeName')}*`}
                  control={control}
                  disabled={isView}
                />
                <Box mt={2}>
                  <SelectField
                    name="storeTypeId"
                    label={`${t('store.storeTypeName')}*`}
                    control={control}
                    options={storeTypeOptions}
                    disabled={isView}
                  />
                </Box>
                <InputField
                  name="imageUrl"
                  label={`${t('store.img')}*`}
                  control={control}
                  onChange={handelInputFieldImgChange}
                  disabled={isView}
                />
                <Stack spacing={2}>
                  <Box
                    style={{
                      display: 'flex',
                      flexFlow: 'row nowrap',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '10px',

                      height: '35.5vh',
                      width: '100%',
                    }}
                    mt={3}
                    mb={3}
                  >
                    <ThumbImgStyle
                      alt="error"
                      src={imgLink}
                      onError={(e) => setImglink(Images.DEFAULT_IMG)}
                    />
                  </Box>
                </Stack>
              </Stack>
            </Card>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom marginBottom={2}>
              {t('store.addressMap')}
            </Typography>
            <Stack spacing={2}>
              <SearchAddress onChangeAddress={handelSelectLocation} />

              <MapDraggable
                location={location}
                onDraggable={handelOnDragMarker}
                icon={IconMyStore}
              />

              <InputField
                name="coordinateString"
                label={`${t('store.location')}*`}
                control={control}
                disabled
              />
              <InputAreaField
                name="address"
                label={`${t('store.address')}*`}
                control={control}
                disabled={isView}
              />
            </Stack>
          </Card>
          {isView ? (
            <></>
          ) : (
            <Box
              style={{
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'flex-end',
                alignContent: 'center',
                backgroundColor: '#fff',
                marginTop: '16px',
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  navigate(`${PATH_DASHBOARD.store.root}`);
                }}
                size="medium"
                startIcon={<Icon icon={arrowCircleLeftOutline} />}
                style={{ marginRight: '15px' }}
              >
                {t('content.backHomePage')}
              </Button>
              <LoadingButton
                disabled={!isDirty}
                loading={isSubmitting}
                type="submit"
                variant="contained"
                size="medium"
                startIcon={<Icon icon={saveFill} />}
              >
                {isEdit ? t('common.btnUpdate') : t('common.btnSubmit')}
              </LoadingButton>
            </Box>
          )}
        </Grid>
      </Grid>
    </form>
  );
}
