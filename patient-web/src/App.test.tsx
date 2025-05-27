import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { App } from './App';  // ← named import

 test('renders learn react link', () => {
   render(
     <Provider store={store}>
       <App />
     </Provider>
   );
   expect(screen.getByText(/learn react/i)).toBeInTheDocument();
 });
