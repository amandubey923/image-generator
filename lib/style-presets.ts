export type StylePreset = {
  slug: string;
  label: string;
  thumbnailPath: string;
  thumbnailAlt: string;
};

export const stylePresets: StylePreset[] = [
  {
    slug: "storybook-3d",
    label: "Storybook 3D",
    thumbnailPath: "/storybook-example.png",
    thumbnailAlt: "Storybook style example preview",
  },
  {
    slug: "anime-cel",
    label: "Anime Cel",
    thumbnailPath: "/anime-cel-example.png",
    thumbnailAlt: "Anime cel style example preview",
  },
  {
    slug: "clay-render",
    label: "Clay Render",
    thumbnailPath: "/clay-render-example.png",
    thumbnailAlt: "Clay render style example preview",
  },
  {
    slug: "pixart",
    label: "Pixart",
    thumbnailPath: "/pixart-example.png",
    thumbnailAlt: "Pixart style example preview",
  },
  {
    slug: "voxel-block",
    label: "Voxel Block",
    thumbnailPath: "/voxel-block-example.png",
    thumbnailAlt: "Voxel block style example preview",
  },
  {
    slug: "marble-sculpture",
    label: "Marble Sculpture",
    thumbnailPath: "/marble-sculpture-example.png",
    thumbnailAlt: "Marble sculpture style example preview",
  },
];
