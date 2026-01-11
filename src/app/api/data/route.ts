import { NextResponse } from 'next/server'

import {
  HeaderData,
  FeaturesData,
  ExpertChiefData,
  GalleryImagesData,
  FullMenuData,
  FooterLinkData,
} from '@/data/siteContent'

export const GET = () => {
  return NextResponse.json({
    HeaderData,
    FeaturesData,
    ExpertChiefData,
    GalleryImagesData,
    FullMenuData,
    FooterLinkData,
  })
}
