import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Spinner from './components/Spinner';

const Results = lazy(() => import('./pages/results'));
const NotFound = lazy(() => import('./pages/404'));

const Router = () => {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Suspense fallback={<Spinner />}>
                                <Results />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/404"
                        element={
                            <Suspense fallback={<Spinner />}>
                                <NotFound />
                            </Suspense>
                        }
                    />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
};

export default Router;
