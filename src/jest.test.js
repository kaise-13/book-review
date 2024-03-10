import React from 'react';
import { render } from "@testing-library/react";
import { screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom'
import Home from './pages/Home';

describe("Home", () => {
    test("check text", () => {
        render(
            <BrowserRouter>
              <Home />
            </BrowserRouter>
        );
        const homeText = screen.getByText('ホーム画面');
        const linkName = screen.getByText('新規作成');
        const linkButton = screen.getByRole('link');
        
        expect(homeText).toBeInTheDocument();
        expect(linkName).toBeInTheDocument();
        expect(linkButton).toBeInTheDocument();
    })
})