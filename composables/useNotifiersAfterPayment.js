import AWN from 'awesome-notifications';

export default function useNotifiersAfterPayment() {
  const notifier = new AWN({
    position: 'top-left',
  });
  console.log('notifier: ', notifier);

  const route = useRoute();
  const router = useRouter();

  if (route.query.paymentSuccess === 'true') {
    notifier.success('Payment succeeded!');
    setTimeout(() => {
      router.replace({ query: null });
    }, notifier.durations.global || 5000);
  }

  if (route.query.paymentSuccess === 'false') {
    notifier.alert('Payment failed!');
    setTimeout(() => {
      router.replace({ query: null });
    }, notifier.durations.global || 5000);
  }
}
